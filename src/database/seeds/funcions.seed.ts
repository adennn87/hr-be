import { Function_permission as FunctionEntity } from "src/function/entities/function.entity";
import { DataSource } from "typeorm";

export const SYSTEM_FUNCTIONS = [
    // USER
    { code: 'USER_CREATE', name: 'Create User', module: 'USER' },
    { code: 'USER_VIEW', name: 'View Users', module: 'USER' },
    { code: 'USER_UPDATE', name: 'Update User', module: 'USER' },
    { code: 'USER_DELETE', name: 'Delete User', module: 'USER' },

    // TIMEKEEPING
    { code: 'TIMEKEEPING_CREATE', name: 'Create Timekeeping', module: 'TIMEKEEPING' },
    { code: 'TIMEKEEPING_VIEW', name: 'View Timekeeping', module: 'TIMEKEEPING' },
    { code: 'TIMEKEEPING_DETAIL', name: 'Timekeeping Detail', module: 'TIMEKEEPING' },
    { code: 'TIMEKEEPING_UPDATE', name: 'Update Timekeeping', module: 'TIMEKEEPING' },
    { code: 'TIMEKEEPING_DELETE', name: 'Delete Timekeeping', module: 'TIMEKEEPING' },

    // WEEKLY SCHEDULE
    { code: 'WEEKLY_SCHEDULE_CREATE', name: 'Create Weekly Schedule', module: 'WEEKLY_SCHEDULE' },
    { code: 'WEEKLY_SCHEDULE_VIEW', name: 'View Weekly Schedule', module: 'WEEKLY_SCHEDULE' },
    { code: 'WEEKLY_SCHEDULE_DETAIL', name: 'Weekly Schedule Detail', module: 'WEEKLY_SCHEDULE' },
    { code: 'WEEKLY_SCHEDULE_UPDATE', name: 'Update Weekly Schedule', module: 'WEEKLY_SCHEDULE' },
    { code: 'WEEKLY_SCHEDULE_DELETE', name: 'Delete Weekly Schedule', module: 'WEEKLY_SCHEDULE' },

    // ROLE
    { code: 'ROLE_CREATE', name: 'Create Role', module: 'ROLE' },
    { code: 'ROLE_VIEW', name: 'View Roles', module: 'ROLE' },
    { code: 'ROLE_DETAIL', name: 'Role Detail', module: 'ROLE' },
    { code: 'ROLE_UPDATE', name: 'Update Role', module: 'ROLE' },
    { code: 'ROLE_DELETE', name: 'Delete Role', module: 'ROLE' },

    // ASSET
    { code: 'ASSET_CREATE', name: 'Create Asset', module: 'ASSET' },
    { code: 'ASSET_VIEW', name: 'View Assets', module: 'ASSET' },
    { code: 'ASSET_DETAIL', name: 'Asset Detail', module: 'ASSET' },
    { code: 'ASSET_UPDATE', name: 'Update Asset', module: 'ASSET' },
    { code: 'ASSET_DELETE', name: 'Delete Asset', module: 'ASSET' },

    // ASSET ALLOCATION
    { code: 'ASSET_ALLOCATE_CREATE', name: 'Allocate Asset', module: 'ASSET_ALLOCATE' },
    { code: 'ASSET_ALLOCATE_VIEW', name: 'View Asset Allocation', module: 'ASSET_ALLOCATE' },
    { code: 'ASSET_ALLOCATE_DETAIL', name: 'Asset Allocation Detail', module: 'ASSET_ALLOCATE' },
    { code: 'ASSET_ALLOCATE_UPDATE', name: 'Update Asset Allocation', module: 'ASSET_ALLOCATE' },
];


export async function seedFunctions(dataSource: DataSource) {
    const functionRepo = dataSource.getRepository(FunctionEntity);

    for (const func of SYSTEM_FUNCTIONS) {
        const exists = await functionRepo.findOne({
            where: { code: func.code },
        });

        if (!exists) {
            await functionRepo.save(func);
        }
    }

    console.log('Seed functions done');
}