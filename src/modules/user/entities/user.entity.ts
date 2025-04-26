import { Exclude, Expose } from "class-transformer";
import { Roles } from "../../../common/enums/role.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "src/modules/product/entities/product.entity";
import { Balance } from "src/modules/balance/entities/balance.entity";
import { Order } from "src/modules/order/entities/order.entity";

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
  
    @Exclude()
    @CreateDateColumn({ type: 'timestamp', select: false })
    created_at: Date;
  
    @Exclude()
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

    // One to Many relation with Product
    @OneToMany(() => Product, (product) => product.user, { onDelete: 'CASCADE' })
    products: Product[];
    
    // One to One relation with Balance
    @OneToOne(() => Balance, (balance) => balance.user, { cascade: true })
    balance: Balance;

    // One to Many relation with Order
    @OneToMany(() => Order, (order) => order.user, { onDelete: 'CASCADE' })
    orders: Order[];
}