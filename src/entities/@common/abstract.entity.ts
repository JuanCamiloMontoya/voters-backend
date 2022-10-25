import { Exclude } from "class-transformer"
import { CreateDateColumn, UpdateDateColumn } from "typeorm"

export abstract class AbstractEntity {

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

}