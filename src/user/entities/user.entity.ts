import { Exclude, Expose } from "class-transformer";
import { Roles } from "src/common/enums/role.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Expose()
    @Column({unique: true})
    username: string;
  
    @Exclude()
    @Column()
    password: string;
  
    @Expose()
    @Column()
    fullname: string;
  
    @Expose()
    @Column()
    email: string;
  
    @Exclude()
    @Column({type: "enum", enum: Roles, default: Roles.BUYER})
    role: string;
  
    @Expose()
    @CreateDateColumn({ type: 'timestamp', select: false })
    created_at: Date;
  
    @Expose()
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updated_at: Date;
  
    @Exclude()
    @DeleteDateColumn({ type: 'timestamp', select: false })
    deleted_at?: Date;
  
    @Expose()
    @Column({ default: false })
    isActive: boolean;

    @Exclude()
    @Column({ default: false })
    isDeleted: boolean;
}