import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";


class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    };

    async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
        const specifications = this.repository.create({
            description,
            name
        });

        await this.repository.save(specifications);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({
            name,
        });
        
        return specification;
    }
     
};

export { SpecificationsRepository };