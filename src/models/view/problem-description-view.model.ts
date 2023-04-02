import ProblemComplexity from "../enums/problem-rarity.enum";

interface ProblemDescriptionView { 
  problemComplexity: ProblemComplexity;
  title: string;
  body: string;
  sampleInput: string;
  sampleOutput: string;
  constraints: string;
  tags: string[];
}

export default ProblemDescriptionView;