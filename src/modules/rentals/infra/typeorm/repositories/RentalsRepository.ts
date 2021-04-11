import { getRepository, IsNull, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: { car: { id: car_id }, end_date: IsNull() },
    });
  }
  async findByRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { user_id, end_date: IsNull() } });
  }
  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car: { id: car_id },
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne({ where: { id } });
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.repository.find({ where: { user_id }, relations: ['car'] });
  }
}

export { RentalsRepository };
