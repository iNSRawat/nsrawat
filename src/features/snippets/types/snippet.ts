export type SnippetMetadata = {
    title: string;
    description: string;
    language: string;
    createdAt: string;
    updatedAt?: string;
};

export type Snippet = {
    metadata: SnippetMetadata;
    slug: string;
    content: string;
};
