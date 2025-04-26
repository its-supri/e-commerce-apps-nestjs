import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtUser } from 'src/common/class/jwt-user.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    async findAll(): Promise<Product[]> {
        return this.productRepository.find({ relations: ['user'] });
    }

    async create(createProductDto: CreateProductDto, jwtData: JwtUser): Promise<any> {
        const { name, price, stock } = createProductDto;

        const userId = jwtData.id;
        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const newProduct = this.productRepository.create({
            name,
            price,
            stock,
            slug,
            user: { id: userId }
        });

        return this.productRepository.save(newProduct);
    }

    async update(updateProductDto: UpdateProductDto, slug: string, jwtData: JwtUser): Promise<Product> {
        const product = await this.productRepository.findOne({ 
            where: { 
                slug,
                user: { id: jwtData.id }
            } 
        });

        if (!product) {
            throw new NotFoundException('Product not found or you do not have permission to update it');
        }

        const hasChanges = Object.entries(updateProductDto).some(([key, value]) => {
            return value !== undefined && value !== product[key];
        });
        
        if (!hasChanges) {
            throw new ConflictException('No changes to update');
        }

        if (product.name !== updateProductDto.name) {
            updateProductDto.slug = updateProductDto.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        const updatedProduct = { ...product, ...updateProductDto };
        return this.productRepository.save(updatedProduct);
    }

    async delete(slug: string, jwtData: JwtUser): Promise<Product> {
        const product = await this.productRepository.findOne({ 
            where: { 
                slug,
                user: { id: jwtData.id }
            } 
        });

        if (!product) {
            throw new NotFoundException('Product not found or you do not have permission to delete it');
        }

        product.isDeleted = true;
        return await this.productRepository.save(product);
    }
}