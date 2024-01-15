// import { Carousel } from "./ui/carousel";

function History() {
    console.log("History");
     return (
        <div>
            <CarouselSize />
        </div>
    )
}

export default History


import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Link } from "react-router-dom";

export function CarouselSize() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Month is 0-based, so add 1
    const day = today.getDate();
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-sm"
        >
            <CarouselContent className="flex-row-reverse">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Link key={index} to={'/History'+today}>
                    <CarouselItem  className="basis-1/3 md:basis-1/2 lg:basis-1/3 ">
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-xl font-semibold">{`${year}-${month}-${day - index}` }</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem></Link>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}