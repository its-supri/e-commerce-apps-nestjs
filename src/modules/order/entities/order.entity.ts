import { OrderStatus } from "../../../common/enums/order.enum";
import { Product } from "src/modules/product/entities/product.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column({type: "enum", enum: OrderStatus, default: OrderStatus.PENDING})
    status: OrderStatus;

    @Column()
    userId: number;

    @Column()
    productId: number;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Product, (product) => product.orders)
    @JoinColumn({ name: 'productId' })
    product: Product;
}