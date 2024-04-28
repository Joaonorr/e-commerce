import { after } from "node:test";
import { Product } from "src/product/entities/product.entity";
import { AfterUpdate, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryColumn({type: 'int', generated: true})
    id : number;

    @Column()
    name : string;

    @Column()
    image_link : string;

    @CreateDateColumn({type: 'timestamp'})
    date_created : Date;

    @UpdateDateColumn({type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP'})
    date_updated : Date;

    @OneToMany(() => Product, product => product.categoryId)
    products: Product[];


    // @BeforeUpdate()
    // public setUpdateDate(): void {
    //     this.date_updated = new Date();
    // }

    @AfterUpdate()
    public setUpdateDate(): void {
        this.date_updated = new Date();
    }

}
