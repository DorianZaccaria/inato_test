export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  // Return the new benefit value for the increment case
  increment(i, increaseBy) {
    if (this.drugs[i].benefit + increaseBy > 50) {
      return 50;
    }

    return this.drugs[i].benefit + increaseBy;
  }

  // Return the new benefit value for the decrement case
  decrement(i, decreaseBy) {
    if (this.drugs[i].benefit - decreaseBy < 0) {
      return 0;
    }

    return this.drugs[i].benefit - decreaseBy;
  }

  // Decrease the benefit for a given drug by 1 if the expiration period is
  // above 0, by twice otherwise.
  decreaseBenefit(i) {
    if (this.drugs[i].expiresIn > 0) {
      this.drugs[i].benefit = this.decrement(i, 1);
    } else {
      this.drugs[i].benefit = this.decrement(i, 2);
    }

    this.drugs[i].expiresIn -= 1;
  }

  // Increase the benefit for a given drug by 1 if the expiration period is
  // above 0, by twice otherwise.
  increaseBenefit(i) {
    if (this.drugs[i].expiresIn > 0) {
      this.drugs[i].benefit = this.increment(i, 1);
    } else {
      this.drugs[i].benefit = this.increment(i, 2);
    }

    this.drugs[i].expiresIn -= 1;
  }

  // Fervex is a snowflake, its benefit update is handled in this function
  updateFervex(i) {
    this.drugs[i].expiresIn -= 1;

    switch (true) {
      case this.drugs[i].expiresIn < 0:
        this.drugs[i].benefit = 0;
        break;
      case this.drugs[i].expiresIn <= 5:
        this.drugs[i].benefit = this.increment(i, 3);
        break;
      case this.drugs[i].expiresIn <= 10:
        this.drugs[i].benefit = this.increment(i, 2);
        break;
      default:
        this.drugs[i].benefit = this.increment(i, 1);
    }
  }

  //  Main function to update all drugs benefits
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      switch (this.drugs[i].name) {
        // Do nothing for the magic pill as it's magic ;)
        case "Magic Pill":
          break;
        // Herbal Tea increases benefit over time.
        case "Herbal Tea":
          this.increaseBenefit(i);
          break;
        // Fervex has a special benefit update
        case "Fervex":
          this.updateFervex(i);
          break;
        default:
          this.decreaseBenefit(i);
      }
    }

    return this.drugs;
  }
}
