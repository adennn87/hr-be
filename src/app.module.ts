import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Thêm để dùng .env
import { MySqlModule } from './database/mysql.module'; // Import module đã tách riêng
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { FunctionModule } from './function/function.module';
// import { DashboardModule } from './dashboard/dashboard.module';
import { AllocatedAssetsModule } from './allocated-assets/allocated-assets.module';
import { TimekeepingModule } from './timekeeping/timekeeping.module';
import { WeeklySchedulesModule } from './weekly-schedules/weekly-schedules.module';

@Module({
  imports: [
    // 1. Load biến môi trường từ file .env (Bảo mật Zero Trust)
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // 2. Sử dụng kết nối Database đã được tách riêng ở folder database
    MySqlModule, 

    // 3. Các module nghiệp vụ
    AuthModule,
    UsersModule,
    RolesModule,
    FunctionModule,
    AllocatedAssetsModule,
    TimekeepingModule,
    WeeklySchedulesModule,
    // DashboardModule,
    WeeklySchedulesModule
  ],
})
export class AppModule {}