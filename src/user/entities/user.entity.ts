import { Roles } from "src/common/enums/role.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string;
  
    @Column()
    password: string;
  
    @Column()
    fullname: string;
  
    @Column()
    email: string;
  
    @Column({type: "enum", enum: Roles, default: Roles.BUYER})
    role: string;
  
    @CreateDateColumn({ type: 'timestamp', select: false })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updated_at: Date;
  
    @DeleteDateColumn({ type: 'timestamp', select: false })
    deleted_at?: Date;
  
    @Column({ default: false })
    isActive: boolean;

    @Column({ default: false })
    isDeleted: boolean;
}