Tired of existing carousel libraries, which come with bloated bells and whistles and complicated implementation that leads to bulky file sizes, I decided to put together a carousel on my own terms.

Written in TypeScript with no external dependencies, the library comes out being only 2kb gzipped.

# Background

I wanted a carousel to use that was as simple as possible. All it does is it takes a container of elements and displays only the items in view and slides them around for you.

Any transitions, controls, or styling that you want can be implemented how you want it.

In short, it's a carousel that just does the carousel stuff.

# Example
``` html
<div class="my-carousel">
    <img src='foo' />
    <img src='bar' />
    ...
</div>
```
``` ts
// A carousel that automatically slides every 2s
const el = document.getElementById('carousel')
const controller = new CarouselController({
    container: el,
    perPage: 3,
    timingDuration: 200,
})

setInterval(() => controller.changeBy(1), 2000)
```
``` scss
.carousel {
    position: relative;
    justify-content: center;
    align-items: center;

    .carousel-slide {
        position: absolute;
        transition-timing-function: ease-in-out;

        &.in {
            opacity: 1;
        }
        &.out {
            opacity: 0;
        }
    }

    &:not(.transitioning):not(.dragging) .carousel-slide.out {
        display: none;
    }
}
```