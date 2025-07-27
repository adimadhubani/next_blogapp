import {
  AllArticlesPage, 
} from "@/components/articles/all-articles-page";
import ArticleSearchInput from "@/components/articles/article-search-input";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchArticleByQuery } from "@/lib/query/fetch-articles";
import Link from "next/link";

const ITEMS_PER_PAGE = 3; // Number of items per page

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const searchText = Array.isArray(searchParams.search) 
    ? searchParams.search[0] 
    : searchParams.search || "";
  
  const pageParam = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
  const currentPage = Number(pageParam) || 1;
  
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
          <Link href={'/'}>
            <Button>Back To Dashboard</Button>
          </Link>
        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            All Articles
          </h1>
          {/* Search Bar */}
          <Suspense>
            <ArticleSearchInput />
          </Suspense>
        </div>
        {/* All article page  */}
        <AllArticlesPage articles={articles} />
        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          {/* Prev Button */}
          <Link
            href={`?search=${searchText}&page=${currentPage - 1}`}
            passHref
          >
            <Button variant="ghost" size="sm" disabled={currentPage === 1}>
              ← Prev
            </Button>
          </Link>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <Link
              key={index}
              href={`?search=${searchText}&page=${index + 1}`}
              passHref
            >
              <Button
                variant={`${currentPage === index + 1 ? 'destructive' : 'ghost'}`}
                size="sm"
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </Button>
            </Link>
          ))}

          {/* Next Button */}
          <Link
            href={`?search=${searchText}&page=${currentPage + 1}`}
            passHref
          >
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage === totalPages}
            >
              Next →
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Page;