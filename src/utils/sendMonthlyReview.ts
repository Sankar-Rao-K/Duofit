export async function sendMonthlyReview(data: any): Promise<boolean> {
  try {
    const formData = new FormData();

    // Web3Forms Access Key
    formData.append(
      "access_key",
      "5f818451-df1b-43db-8385-4f10aa4f9266"
    );

    formData.append(
      "subject",
      "📋 DUOFIT Monthly Progress Review"
    );

    formData.append(
      "from_name",
      "DUOFIT Website"
    );

    const valuablePart = [
      ...(data.valuablePart || []),
      data.valuablePartOther,
    ]
      .filter(Boolean)
      .join(", ");

    const improveArea =
      data.improveArea === "Other"
        ? data.improveAreaOther
        : data.improveArea;

    formData.append(
      "message",
      `
==============================
DUOFIT MONTHLY PROGRESS REVIEW
==============================

1. Looking back to when you started DUOFIT, what visible or noticeable changes have you seen in yourself so far?

Answer:
${data.visibleChanges || "-"}

--------------------------------------------

2. What has been the most valuable part of your DUOFIT experience so far?

Answer:
${valuablePart || "-"}

--------------------------------------------

3. What is one thing you are doing differently now compared with when you started?

Answer:
${data.doingDifferently || "-"}

--------------------------------------------

4. What is one area of your health or lifestyle you would most like to improve further?

Answer:
${improveArea || "-"}

--------------------------------------------

5. If you could describe your DUOFIT journey so far to someone who is where you were when you started, what would you tell them?

Answer:
${data.journeyMessage || "-"}

--------------------------------------------

Generated from DUOFIT Website
`
    );

    const response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    return result.success;
  } catch (error) {
    console.error(error);
    return false;
  }
}