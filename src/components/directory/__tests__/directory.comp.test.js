import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../assets/utils/test/test.utils";
import Directory from "../directory.component";

describe("Directory tests", () => {
  test("It should render each directory item", () => {
    const directoryItems = ['hats', "jackets", "sneakers", 'womens', 'mens'];
    renderWithProviders(<Directory />)
    directoryItems.forEach(item => {
      let regex = new RegExp(`^${item}$`,'i')
      expect(screen.getByText(regex)).toBeInTheDocument()
    })
  })
})