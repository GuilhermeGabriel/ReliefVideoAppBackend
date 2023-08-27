-- CreateTable
CREATE TABLE "history" (
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "bookmark" (
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "history_url_key" ON "history"("url");

-- CreateIndex
CREATE UNIQUE INDEX "bookmark_url_key" ON "bookmark"("url");
