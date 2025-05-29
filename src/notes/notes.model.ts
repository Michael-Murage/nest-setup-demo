import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Note extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;
}

