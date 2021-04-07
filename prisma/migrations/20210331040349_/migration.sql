-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "index" INTEGER,
    "image" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PokemonToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon.index_unique" ON "Pokemon"("index");

-- CreateIndex
CREATE UNIQUE INDEX "_PokemonToUser_AB_unique" ON "_PokemonToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PokemonToUser_B_index" ON "_PokemonToUser"("B");

-- AddForeignKey
ALTER TABLE "_PokemonToUser" ADD FOREIGN KEY ("A") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToUser" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
