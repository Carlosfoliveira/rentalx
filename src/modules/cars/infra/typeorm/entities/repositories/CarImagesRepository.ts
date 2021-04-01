import { getRepository, Repository } from 'typeorm';

import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';

import { CarImage } from '../CarImage';

class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }

  async findByCarId(car_id: string): Promise<CarImage[]> {
    return this.repository.find({ where: { car_id } });
  }

  async delete(id: string): Promise<void> {
    this.repository.delete({ id });
  }
}

export { CarImagesRepository };
