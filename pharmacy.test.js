import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(
      new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("test", 1, 2)]);
  });

  it("should not decrease the benefit if it is already set to 0", () => {
    expect(
      new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue()
    ).toEqual([new Drug("test", 1, 0)]);
  });

  it("should decrease the benefit by two if expiresIn is below 0", () => {
    expect(
      new Pharmacy([new Drug("test", -2, 5)]).updateBenefitValue()
    ).toEqual([new Drug("test", -3, 3)]);
  });

  it("should increase the benefit if the drug is Herbal Tea", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 1, 4)]);
  });

  it("should not increase the benefit if it is already set to 50", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 2, 50)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 1, 50)]);
  });

  it("should increase the benefit by two if expiresIn is below 0", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", -2, 6)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", -3, 8)]);
  });

  it("should not update Magic pill", () => {
    const drugs = [
      new Drug("Magic Pill", 3, 2),
      new Drug("Magic Pill", -3, 2),
      new Drug("Magic Pill", 3, 0),
      new Drug("Magic Pill", 3, 50),
      new Drug("Magic Pill", -3, 0),
      new Drug("Magic Pill", -3, 50)
    ];

    expect(new Pharmacy(drugs).updateBenefitValue()).toEqual(drugs);
  });

  it("should correctly increase the benefit for the drug Fervex", () => {
    const drugs = [
      new Drug("Fervex", 15, 2),
      new Drug("Fervex", 8, 2),
      new Drug("Fervex", 3, 2),
      new Drug("Fervex", 0, 18)
    ];

    const result = [
      new Drug("Fervex", 14, 3),
      new Drug("Fervex", 7, 4),
      new Drug("Fervex", 2, 5),
      new Drug("Fervex", -1, 0)
    ];

    expect(new Pharmacy(drugs).updateBenefitValue()).toEqual(result);
  });
});
