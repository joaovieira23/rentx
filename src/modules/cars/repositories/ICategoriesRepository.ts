import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create(name: string, description: string): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };