import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Article } from '../../libs/dto/article/article';
import { ArticleInput } from '../../libs/dto/article/article.input';
import { AuthMember } from '../auth/decorators/auth.member';
import { ObjectId } from 'mongoose';
import { UpdateArticle } from '../../libs/dto/article/article.update';
import { WithoutGuards } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/types/config';

@Resolver()
export class ArticleResolver {
    constructor(private readonly articleService: ArticleService) { }

    @UseGuards(AuthGuard)
    @Mutation(() => Article)
    public async createArticle(
        @Args("input") input: ArticleInput,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Article> {
        console.log("Mutation: createArticle");
        return await this.articleService.createArticle(input, memberId)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Article)
    public async updateArticle(
        @Args("input") input: UpdateArticle,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Article> {
        console.log("Mutation: updateArticle")
        return await this.articleService.updateArticle(input, memberId)
    }

    @UseGuards(WithoutGuards)
    @Query(() => Article)
    public async getArticle(
        @Args("input") input: String,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Article> {
        console.log("Query: getArticle");
        const targetArticleId = shapeIntoMongoObjectId(input);
        return await this.articleService.getArticle(targetArticleId, memberId)
    }
    getAllArticles() { }
    likeTargetArticle() { }

    //ADMIN
    createArticleByAdmin() { }
    updateArticleByAdmin() { }
    getAllArticlesByAdmin() { }
    removeArticelByAdmin() { }
}
