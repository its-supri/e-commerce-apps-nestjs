import { Expose } from "class-transformer";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Balance {
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column()
    balance: number;

    @OneToOne(() => User, (user) => user.balance)
    @JoinColumn()
    user: User;
}
