import ClosingCta from '@/components/ClosingCta';
import Hero from '@/components/Hero';
import RealWorkPreview from '@/components/RealWorkPreview';
import ReviewPull from '@/components/ReviewPull';
import ServicesPreview from '@/components/ServicesPreview';
import ShopCards from '@/components/ShopCards';
import Standards from '@/components/Standards';

/**
 * Home is a trailer, not the whole film: each block sells one idea and hands
 * off to the page that carries the detail.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ShopCards />
      <ServicesPreview />
      <RealWorkPreview />
      <ReviewPull />
      <Standards />
      <ClosingCta />
    </>
  );
}
