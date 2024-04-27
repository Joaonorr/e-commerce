import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryColumn({type: 'int', generated: true})
    id : number;

    @Column({length: 50, nullable: false})
    name : string;

    @Column({length: 10, nullable: false})
    sku : string;

    @ManyToOne(
        () => Category,
        category => category.id,
        {onDelete: 'SET NULL', nullable: false}
    )
    category_id: number;

    @Column({length: 250, nullable: false})
    description : string;

    @Column({length: 500, nullable: false})
    large_description : string;

    @Column()
    price : number;

    @Column()
    discount_price : number;

    @Column()
    discount_percent : number;

    @Column()
    is_new : boolean;

    @Column({length: 250})
    image_link : string;

    @Column({length: 1000})
    other_image_links : string;

    @CreateDateColumn({type: 'timestamp'})
    date_created : string;

    @CreateDateColumn({type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP'})
    date_updated : string;
}
