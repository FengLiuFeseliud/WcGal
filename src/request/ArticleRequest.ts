import { useArticleStore } from "@/stores/ArticleStore";
import { AxiosUilt, type PageResponse, type Response } from "@/utils/AxiosUtils";
import type { User } from "./UserRequest";

interface Tag{
    tagId: number
    tagName: string
    tagCount: number
}

interface Article{
    articleId: number
    articleTitle: string
    articleAuthor: User
    articleContent: string
    cover: string
    tags: string
    tagsData: Tag[]
    createTime: string
    updateTime: string
}

class ArticleRequest{
    private static allTags: Tag[]

    public static async getArticle(articleId: number): Promise<Response<Article>>{
        return <Response<Article>><unknown>(await AxiosUilt.create().post("/galgame/" + articleId))
    }

    public static async getArticles(page: number, limit: number, desc: boolean, keyword?: string): Promise<PageResponse<Article[]> | null>{
        const key = keyword == null ? "": keyword.trimEnd()
        const data = <PageResponse<Article[]>><unknown>(await AxiosUilt.create().post(key != "" ? "/galgame/search" : "/galgame/list", {
            keyword: key,
            page: page,
            limit: limit,
            desc: desc != null ? desc : false
        }))

        if(data == null){
            return null
        }

        if(keyword === undefined || keyword == ""){
            useArticleStore().setCount(data.count)
        }
        return data
    }

    public static async getCount(): Promise<number> {
        const data = await AxiosUilt.create().post("/galgame/count");
        if(data == null){
            return 0;
        }

        useArticleStore().setCount(data.data)
        return data.data
    }

    public static async getAllTags(): Promise<Tag[]> {
        if(ArticleRequest.allTags != null && ArticleRequest.allTags.length != 0){
            return ArticleRequest.allTags;
        }
        
        const data = await AxiosUilt.create().post("/galgame/tags/all")
        ArticleRequest.allTags = data != null ? data.data : {}
        useArticleStore().setTags(ArticleRequest.allTags)
        return ArticleRequest.allTags
    }
}

export {ArticleRequest, type Tag, type Article}