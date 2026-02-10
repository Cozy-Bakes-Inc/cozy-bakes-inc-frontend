import StorySection from "../home/story-section";
import StoryCommitment from "./story-commitment";
import StoryHero from "./story-hero";
import StoryVideo from "./story-video";

function Story() {
  return (
    <>
      <StoryHero />
      <StoryVideo />
      <StorySection bg="bg-background" circle={false} />
      <StoryCommitment />
    </>
  );
}

export default Story;
