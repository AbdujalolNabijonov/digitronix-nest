import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { View } from '../../libs/dto/view/view';
import { ViewInput } from '../../libs/dto/view/view.input';

@Injectable()
export class ViewService {
    constructor(@InjectModel("View") private readonly viewModel: Model<View>) { }

    public async recordView(input: ViewInput): Promise<View | null> {
        const existance = await this.viewModel.findOne(input).exec();
        if (existance) {
            return null
        } else {
            return await this.viewModel.create(input);
        }
    }


}
