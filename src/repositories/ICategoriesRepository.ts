import { Category } from "../model/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create(name: string, description: string): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };