import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashPasswordHelper } from '@/helpers/util';
import aqp from 'api-query-params';
import { ChangePasswordAuthDto, CodeAuthDto, CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly mailerService: MailerService,
  ) {}

  isEmailExist = async (email: string) => {
    const user = await this.userRepository.findOneBy({ email });
    return Boolean(user);
  };

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;

    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(`Email đã tồn tại: ${email}. Vui lòng sử dụng email khác.`);
    }

    const hashPassword = await hashPasswordHelper(password);
    const user = this.userRepository.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      image,
      isActive: true,
    });

    await this.userRepository.save(user);
    return {
      id: user.id,
    };
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query || '');
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current || current < 1) current = 1;
    if (!pageSize || pageSize < 1) pageSize = 10;

    const [results, totalItems] = await this.userRepository.findAndCount({
      where: filter as any,
      skip: (current - 1) * pageSize,
      take: pageSize,
      order: this.normalizeSort(sort),
      select: ['id', 'name', 'email', 'phone', 'address', 'image', 'isActive', 'createdAt'],
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      meta: {
        current,
        pageSize,
        pages: totalPages,
        total: totalItems,
      },
      results,
    };
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async update(updateUserDto: UpdateUserDto) {
    const id = parseInt(updateUserDto.id as any, 10);
    if (Number.isNaN(id)) {
      throw new BadRequestException('id không hợp lệ');
    }

    const { id: __, ...payload } = updateUserDto as any;
    await this.userRepository.update(id, payload as any);
    return this.userRepository.findOneBy({ id });
  }

  async remove(idString: string): Promise<{ acknowledged: boolean; deletedCount?: number }> {
    const id = parseInt(idString, 10);
    if (Number.isNaN(id)) {
      throw new BadRequestException('id không hợp lệ');
    }

    const result = await this.userRepository.delete(id);
    return {
      acknowledged: result.affected > 0,
      deletedCount: result.affected ?? 0,
    };
  }

  async handleRegister(registerDto: CreateAuthDto) {
    const { name, email, password } = registerDto;

    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(`Email đã tồn tại: ${email}. Vui lòng sử dụng email khác.`);
    }

    const hashPassword = await hashPasswordHelper(password);
    const codeId = uuidv4();
    const user = this.userRepository.create({
      name,
      email,
      password: hashPassword,
      isActive: false,
      codeId,
      codeExpired: dayjs().add(5, 'minutes').toDate(),
    });

    await this.userRepository.save(user);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Activate your account at @hoidanit',
      template: 'register',
      context: {
        name: user?.name ?? user.email,
        activationCode: codeId,
      },
    });

    return {
      id: user.id,
    };
  }

  async handleActive(data: CodeAuthDto) {
    const id = parseInt(data._id, 10);
    if (Number.isNaN(id)) {
      throw new BadRequestException('id không hợp lệ');
    }

    const user = await this.userRepository.findOneBy({ id, codeId: data.code });
    if (!user) {
      throw new BadRequestException('Mã code không hợp lệ hoặc đã hết hạn');
    }

    const isBeforeCheck = dayjs().isBefore(dayjs(user.codeExpired));
    if (isBeforeCheck) {
      await this.userRepository.update(id, { isActive: true });
      return { isBeforeCheck };
    }

    throw new BadRequestException('Mã code không hợp lệ hoặc đã hết hạn');
  }

  async retryActive(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }
    if (user.isActive) {
      throw new BadRequestException('Tài khoản đã được kích hoạt');
    }

    const codeId = uuidv4();
    await this.userRepository.update(user.id, {
      codeId,
      codeExpired: dayjs().add(5, 'minutes').toDate(),
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Activate your account at @hoidanit',
      template: 'register',
      context: {
        name: user?.name ?? user.email,
        activationCode: codeId,
      },
    });
    return { id: user.id };
  }

  async retryPassword(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }

    const codeId = uuidv4();
    await this.userRepository.update(user.id, {
      codeId,
      codeExpired: dayjs().add(5, 'minutes').toDate(),
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Change your password account at @hoidanit',
      template: 'register',
      context: {
        name: user?.name ?? user.email,
        activationCode: codeId,
      },
    });
    return { id: user.id, email: user.email };
  }

  async changePassword(data: ChangePasswordAuthDto) {
    if (data.confirmPassword !== data.password) {
      throw new BadRequestException('Mật khẩu/xác nhận mật khẩu không chính xác.');
    }

    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }

    const isBeforeCheck = dayjs().isBefore(dayjs(user.codeExpired));
    if (isBeforeCheck) {
      const newPassword = await hashPasswordHelper(data.password);
      await this.userRepository.update(user.id, { password: newPassword });
      return { isBeforeCheck };
    }

    throw new BadRequestException('Mã code không hợp lệ hoặc đã hết hạn');
  }

  private normalizeSort(sort: any) {
    if (!sort || typeof sort !== 'object') {
      return {};
    }

    return Object.entries(sort).reduce((result, [key, value]) => {
      result[key] = value === -1 ? 'DESC' : 'ASC';
      return result;
    }, {} as Record<string, 'ASC' | 'DESC'>);
  }
}
