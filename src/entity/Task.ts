import { BaseEntity, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { ColumnNumericTransformer } from "../transformer";
import { Employee } from "./Employee";

@Entity('tasks')
export class Task extends BaseEntity {
  @PrimaryColumn('bigint', {
    transformer: new ColumnNumericTransformer(),
    generated: 'increment'
  })
  id: number;

  @ManyToMany(
    () => Employee,
    employee => employee.assignedTo,
    { nullable: true, cascade: true }
  )
  @JoinTable()
  assignees?: Employee[];

  constructor(args: {
    id: number,
    assignees?: Employee[]
  }) {
    super();
    Object.assign(this, args);
  }
}
