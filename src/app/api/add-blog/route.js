import connectToDB from '@/app/database';
import Blog from '@/app/models/blog';
import Joi from 'joi';
import { NextResponse } from 'next/server';

const AddNewBlog = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
});

export async function POST(req) {
	try {
		await connectToDB();

		const extractBlogData = await req.json();
		const { title, description } = extractBlogData;

		console.log(title, description);

		const { error } = AddNewBlog.validate({
			title,
			description,
		});

		console.log('###	Errror', error);

		if (error) {
			console.log('error : ', error);

			return NextResponse.json({
				success: false,
				message: error.details[0].message,
			});
		}

		const newlyCreateBlogItem = await Blog.create(extractBlogData);
		console.log('### newlyCreateBlogItem : ', newlyCreateBlogItem);

		if (newlyCreateBlogItem) {
			return NextResponse.json({
				success: true,
				message: 'BLog added successfully',
			});
		} else {
			return NextResponse.json({
				success: false,
				message: 'Somthing went wrong ! Please try again',
			});
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			success: false,
			message: 'Somthing went wrong ! Please try again',
		});
	}
}
