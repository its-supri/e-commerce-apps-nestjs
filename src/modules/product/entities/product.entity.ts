import { Exclude, Expose } from "class-transformer";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column()
    name: string;

    @Expose()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    price: number;

    @Expose()
    @Column()
    stock: number;

    @Expose()
    @Column()
    slug: string;

    @Expose()
    @Column({ default: false })
    isDeleted: boolean;

    @Exclude()
    @CreateDateColumn({ type: 'timestamp', select: false })
    created_at: Date;
    
    @Exclude()
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updated_at: Date;

    // Many to One relation with User
    @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
    user: User;
}