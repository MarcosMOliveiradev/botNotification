-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,
    "check" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);
