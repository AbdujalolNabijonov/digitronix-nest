import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Article, Articles } from '../../libs/dto/article/article';
import { ArticleInput, ArticlesInquiry } from '../../libs/dto/article/article.input';
import { AuthMember } from '../auth/decorators/auth.member';
import { ObjectId } from 'mongoose';
import { UpdateArticle } from '../../libs/dto/article/article.update';
import { WithoutGuards } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { Roles } from '../auth/decorators/auth.roles';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

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

    @UseGuards(WithoutGuards)
    @Query(() => Articles)
    public async getAllArticles(
        @Args("input") input: ArticlesInquiry,
        @AuthMember("_id") authMemberId: ObjectId
    ): Promise<Articles> {
        console.log("Query: getAllArticles")
        return await this.articleService.getAllArticles(input, authMemberId)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Article)
    public async likeTargetArticle(
        @Args("input") input: String,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Article> {
        console.log("Mutation: likeTargetArticle");
        const targetArticleId = shapeIntoMongoObjectId(input)
        return await this.articleService.likeTargetArticle(targetArticleId, memberId)
    }

    //ADMIN
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Article)
    public async updateArticleByAdmin(
        @Args("input") input: UpdateArticle
    ): Promise<Article> {
        console.log("Mutation: updateArticleByAdmin")
        return await this.articleService.updateArticleByAdmin(input)
    }

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Query(()=>Articles)
    public async getAllArticlesByAdmin(
        @Args("input") input:ArticlesInquiry
    ):Promise<Articles> { 
        console.log("Query: getAllArticlesByAdmin");
        return await this.articleService.getAllArticlesByAdmin(input)
    }

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(()=>Article)
    public async removeArticelByAdmin(
        @Args("input") input:String
    ):Promise<Article> { 
        console.log("Mutation: removeArticelByAdmin");
        const targetArticleId = shapeIntoMongoObjectId(input)
        return await this.articleService.removeArticelByAdmin(targetArticleId)
    }
}
