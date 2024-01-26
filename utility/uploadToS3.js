const { S3Client,PutObjectCommand } = require('@aws-sdk/client-s3')
const path = require('path')
const fs = require('fs')


function uploadToS3(file,filename){
    return new Promise(async(resolve,reject)=>{

        // making an s3 instence
        const s3Instence = new S3Client({
            credentials : {
                accessKeyId : process.env.AWS_ACCESS_KEY,
                secretAccessKey : process.env.AWS_SECRET_KEY,
            },
            region : 'ap-south-1'
        })

        // we have to upload buffer to aws so I am using readFile to read the image data   
        const fileData = fs.readFileSync(path.join(__dirname,'..',file.path))
        
        // making an object to upload to bucket
        let params = {
            Bucket : process.env.AWS_S3_BUCKET_NAME,
            Key:filename,
            Body : fileData,
        }

        // uploading to s3
        const s3Result = await s3Instence.send(
            new PutObjectCommand(params)
        );
        
        if (s3Result.$metadata.httpStatusCode == 200){
            // now deleting that file from this server
            fs.unlink(path.join(__dirname,'..',file.path),(err)=>{
                if(err){
                    console.log('Some eror occurd during deleting file');
                    resolve(true)
                }
                else{
                    resolve(true)
                }
            })
        }
        else{
            reject('something went wrong')
        }

        // // uploading to s3 bucket
        // s3Instence.send(params,(error,s3Response)=>{
        //     if(error){
        //         console.log('Error occurd :',error)
        //         reject(error)
        //     }
        //     else{
        //         console.log('file uploaded ')
        //         fs.unlink(path.join(__dirname,'..',file.path),(err)=>{
        //         // now deleting that file from this server
        //             if(err){
        //                 console.log('Some eror occurd during deleting file');
        //                 resolve(s3Response.Location)
        //             }
        //             else{
        //                 resolve(s3Response.Location)
        //             }
        //         })
        //     }
        // })
    })
}

module.exports = uploadToS3;