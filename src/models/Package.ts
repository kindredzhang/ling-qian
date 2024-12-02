import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Element } from "../types";

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  imageUrl!: string;

  @Column()
  element!: Element; // 对应五行属性：金木水火土
}