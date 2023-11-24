import {FileHandle} from "./file-handle.model"
import {ProductEnum} from "./productEnum"

export interface Product {
  pid: number
  title: string,
  description: string,
  config: string,
  price: number,
  discountPrice: number,
  images: string,
  active: boolean,
  quantum: number,
  productImages: FileHandle[],
  productEnum: ProductEnum[],
  laptopConfig: {
    cpu: string,
    ram: string,
    hardDrive: string,
    screen: string,
    graphic: string,
    connector: string,
    special: string,
    operatingSystem: string,
    design: string,
    sizeMass: string,
    releaseTime: string
  },
  accessoryConfig: {
    compatible: string,
    resolution: string,
    howToConnect: string,
    wireLength: string,
    typePin: string,
    weight: string,
    brand: string,
    madeIn: string,
    manufacturer: string
  },
  smartPhoneConfig: {
    screen: string,
    beforeCamera: string,
    afterCamera: string,
    ram: string,
    sim: string,
    chip: string,
    pin: string,
    operatingSystem: string,
    storage: string,
  },
  manufacturer: {
    manuId: any,
  }
  category: {
    cateId: any,
  }
  comment: [
    {
      comId: number,
      content: string,
      date: Date,
      user: any
    }
  ],
  reviews: [
    {
      reId: number,
      content: string,
      value: number,
      image: string,
      dateCreate: Date
      user: any,
      pid: number
    }
  ]
}
