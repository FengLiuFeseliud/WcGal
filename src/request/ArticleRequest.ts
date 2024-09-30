import { AxiosUilt, type PageResponse } from "@/utils/AxiosUtils";

interface Tag{
    tagId: number
    tagName: string
    tagCount: number
}

interface Article{
    articleId: number
    articleTitle: string
    articleAuthor: string
    articleContent: string
    cover: string
    tags: string
    tagsData: Tag[]
    createTime: string
    updateTime: string
}

class ArticleRequest{
    private static allTags: Tag[]

    public static async getArticles(page: number, limit: number, desc: boolean, keyword?: string): Promise<PageResponse<Article[]> | null>{
        const key = keyword == null ? "": keyword.trimEnd()
        const data = <PageResponse<Article[]>><unknown>(await AxiosUilt.create().post(key != "" ? "/galgame/search" : "/galgame/list", {
            keyword: key,
            page: page,
            limit: limit,
            desc: desc != null ? desc : false
        }))
        return data != null ? data : null
    }

    public static async getAllTags(): Promise<Tag[]> {
        if(ArticleRequest.allTags != null && ArticleRequest.allTags.length != 0){
            return ArticleRequest.allTags;
        }
        
        const data = await AxiosUilt.create().post("/galgame/tags/all")
        ArticleRequest.allTags = data != null ? data.data : {}
        return ArticleRequest.allTags
    }
}

export {ArticleRequest, type Tag, type Article}