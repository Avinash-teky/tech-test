import * as AWS from 'aws-sdk';
import { query } from './db';

const configS3 = new AWS.S3({
    region: process.env.REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET,
});

type Response = {
    message: string;
    data: Array<any> | Object;
    error?: any;
}

const createCake = async (event: any) => {
    try {
        const body = JSON.parse(event.body);

        let insertResponse = await query(`INSERT INTO cake (name, comment, imageurl, yumfactor)
        VALUES ('${body.name}','${body.comment}','${body.imageurl}',${body.yumfactor})`, null);

        if (insertResponse.rowCount < 1) {
            throw { message: 'Could not insert data' };
        }

        const result: Response = {
            message: 'Cake created successfully!',
            data: []
        }
        return { status: 200, data: result };
    } catch (e) {
        console.error("Create cake error : ", e);
        const error: Response = {
            message: "Internal Server Error!",
            data: [],
            error: e
        };
        return { status: 500, data: error };
    }
}

const getCakes = async (event: any) => {
    try {
        const selectResponse = await query('SELECT * FROM cake ORDER BY id desc', null);
        const result: Response = {
            data: selectResponse.rows,
            message: ''
        };
        return { status: 200, data: result };
    } catch (e) {
        console.error("Get cakes error : ", e);
        const error: Response = {
            message: "Internal Server Error!",
            data: [],
            error: e
        };
        return { status: 500, data: error };
    }
}

const deleteCake = async (event: any) => {
    try {
        const body = JSON.parse(event.body);

        let deleteResponse = await query(`DELETE FROM cake where id = $1`, [body.id]);

        if (deleteResponse.rowCount < 1) {
            throw { message: 'Could not delete data' };
        }

        const result: Response = {
            message: 'Cake deleted successfully!',
            data: []
        };

        return { status: 200, data: result };
    } catch (e) {
        console.error("Delete cake error : ", e);
        const error: Response = {
            message: "Internal Server Error!",
            data: [],
            error: e
        };
        return { status: 500, data: error };
    }
}

const uploadFile = async (event: any) => {
    try {
        const queryParams = event.queryStringParameters;
        const contentType = queryParams.contenttype;
        const ext = queryParams.extension;
        const key = `${Date.now().toString()}.${ext}`;
        const Fields = {
            acl: "public-read",
        };
        const Conditions = [
            ["starts-with", "$key", key],
            ["starts-with", "$Content-Type", contentType],
        ];

        let fileParams = {
            Bucket: process.env.BUCKET,
            Key: key,
            Fields: Fields,
            Conditions,
            Expires: 3600,
        };

        let urlPromise = new Promise((resolve, reject) => {
            configS3.createPresignedPost(fileParams, (error, url) => {
                if (error) {
                    console.error("error", error);
                    reject(error);
                }
                resolve(url);
            });
        });

        let S3Data = await urlPromise;
        let finalUrl = `https://${process.env.BUCKET}.s3-${process.env.REGION}.amazonaws.com/${key}`;

        const result: Response = {
            data: { S3Data: S3Data, key: key, finalUrl: finalUrl },
            message: ''
        };

        return { status: 200, data: result };
    } catch (e) {
        console.error("File upload error : ", e);
        const error: Response = {
            message: "Internal Server Error!",
            data: [],
            error: e
        };
        return { status: 500, data: error };
    }
}

export { createCake, getCakes, deleteCake, uploadFile };
