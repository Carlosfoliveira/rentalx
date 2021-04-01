import { inject, injectable } from 'tsyringe';

import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { deleteFile } from '@utils/file';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carImages = await this.carImagesRepository.findByCarId(car_id);

    carImages.map(async (carImage) => {
      await deleteFile(`./tmp/cars/${carImage.image_name}`);
      await this.carImagesRepository.delete(carImage.id);
    });

    images_name.map(async (image) => {
      await this.carImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
