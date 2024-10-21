import { AxiosUilt, type PageResponse, type Response } from "@/utils/AxiosUtils";
import { type UserInfo } from "./UserRequest";


interface Comment {
    commentId: number
    resourceId: string
    content: string
    commentAuthor: UserInfo
    likes: number
    createTime: string
    updateTime: string
    subCommentCount: number
    subComment: Comment[]
}


enum ResourceType {
    Article = "ar"
}


function getResourceId(id: number, resource: ResourceType): string{
    return resource + "_" + id;
}


class CommentRequest {
    public static async getComments(resourceId: string, page: number, limit: number, desc: boolean): Promise<PageResponse<Comment[]> | null> {
        return <PageResponse<Comment[]>><unknown>(await AxiosUilt.create().post("/comment/" + resourceId, {
            page: page,
            limit: limit,
            desc: desc != null ? desc : false
        }))
    }

    public static async sendComment(resourceId: string, content: string, commentId?: number): Promise<Response<null> | null>{
        return <Response<null>><unknown>(await AxiosUilt.create().post("/comment/send", {
            commentId: commentId,
            resourceId: resourceId,
            content: content
        }))
    }

    public static async updateComment(commentId: number, content: string): Promise<Response<null> | null>{
        return <Response<null>><unknown>(await AxiosUilt.create().post("/comment/update", {
            commentId: commentId,
            content: content
        }))
    }

    public static async delComment(resourceId: string, commentId: number): Promise<Response<null> | null>{
        return <Response<null>><unknown>(await AxiosUilt.create().post("/comment/del", {
            resourceId: resourceId,
            commentId: commentId
        }))
    }
}


export { CommentRequest, getResourceId, type Comment, type ResourceType}