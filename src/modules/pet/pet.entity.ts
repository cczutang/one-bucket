import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pet' ,{schema:"wmmcat" } )
export class PetEntity {

  @PrimaryGeneratedColumn({
      type:"int", 
      name:"id"
      })
  id:number;
      

  @Column("varchar",{ 
      nullable:false,
      unique: true,
      length:150,
      name:"uuid"
      })
  uuid:string;

  @Column("varchar",{ 
      nullable:false,
      unique: true,
      length:100,
      name:"name"
      })
  name:string;
      

  @Column("tinyint",{ 
      nullable:true,
      default: () => "'0'",
      name:"type"
      })
  type:number | null;
      

  @Column("tinyint",{ 
      nullable:true,
      default: () => "'0'",
      name:"gender"
      })
  gender:number | null;
      

  @Column("tinyint",{ 
      nullable:true,
      default: () => "'1'",
      name:"status"
      })
  status:number | null;
      

  @Column("varchar",{ 
      nullable:true,
      length:10,
      name:"health"
      })
  health:string | null;
      

  @Column("text",{ 
      nullable:true,
      name:"remark"
      })
  remark:string | null;
      

  @CreateDateColumn({
      name: 'create_at',
      comment: '创建时间',
    })
  createAt:Date | null;
      

  @UpdateDateColumn({
      name: 'update_at',
      comment: '最后更新时间',
    })
  updateAt:Date | null;
      
}
