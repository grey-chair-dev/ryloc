/** Grey Chair transactional email styling (order-notification layout). */
const GC = {
  gold: "#E5A836",
  green: "#3DDC84",
  orange: "#FF9F0A",
  red: "#FF453A",
  black: "#111111",
  white: "#FFFFFF",
  label: "#9CA3AF",
  muted: "#6B7280",
  dash: "#D1D5DB",
  link: "#2563EB",
  font: "system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  mono: "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace",
} as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td colspan="2" style="border-top:1px dashed ${GC.dash};font-size:0;line-height:0;height:1px;padding:0;">&nbsp;</td>
    </tr>
    <tr>
      <td style="padding:14px 12px 14px 16px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${GC.label};vertical-align:top;width:30%;font-family:${GC.font};">
        ${escapeHtml(label)}
      </td>
      <td style="padding:14px 16px 14px 0;font-size:14px;line-height:1.45;color:${GC.black};vertical-align:top;font-family:${GC.font};">
        ${value}
      </td>
    </tr>`;
}

export function greychairEmailLayout({
  preheader,
  headerTitle,
  badgeLabel,
  badgeColor,
  rows,
  metaLines,
  primaryButton,
  secondaryButton,
  footerNote,
}: {
  preheader: string;
  headerTitle: string;
  badgeLabel: string;
  badgeColor: string;
  rows: { label: string; value: string }[];
  metaLines: string[];
  primaryButton?: { label: string; href: string };
  secondaryButton?: { label: string; href: string };
  footerNote?: string;
}): string {
  const rowsHtml = rows.map((r) => row(r.label, r.value)).join("");

  const metaHtml =
    metaLines.length > 0
      ? `
    ${row(
      "META",
      `<span style="font-family:${GC.mono};font-size:12px;line-height:1.6;">${metaLines.map((line) => escapeHtml(line)).join("<br />")}</span>`,
    )}`
      : "";

  const buttonsHtml =
    primaryButton || secondaryButton
      ? `
        <tr>
          <td colspan="2" style="padding:16px 16px 8px;font-family:${GC.font};">
            <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                ${
                  primaryButton
                    ? `<td style="padding-right:8px;">
                    <a href="${escapeHtml(primaryButton.href)}" style="display:inline-block;padding:10px 16px;background:${GC.black};color:${GC.white};font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;text-decoration:none;font-family:${GC.font};">
                      ${escapeHtml(primaryButton.label)}
                    </a>
                  </td>`
                    : ""
                }
                ${
                  secondaryButton
                    ? `<td>
                    <a href="${escapeHtml(secondaryButton.href)}" style="display:inline-block;padding:9px 16px;background:${GC.white};color:${GC.black};border:1px solid ${GC.black};font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;text-decoration:none;font-family:${GC.font};">
                      ${escapeHtml(secondaryButton.label)}
                    </a>
                  </td>`
                    : ""
                }
              </tr>
            </table>
          </td>
        </tr>`
      : "";

  const footerHtml = footerNote
    ? `
        <tr>
          <td colspan="2" style="padding:8px 16px 16px;font-size:12px;line-height:1.5;color:${GC.muted};font-family:${GC.font};">
            ${formatMultiline(footerNote)}
          </td>
        </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(headerTitle)}</title>
</head>
<body style="margin:0;padding:24px 12px;background:#f3f4f6;font-family:${GC.font};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;border-collapse:collapse;">
    <tr>
      <td style="border:1px solid ${GC.black};background:${GC.white};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr>
            <td style="padding:14px 16px;background:${GC.gold};border-bottom:1px solid ${GC.black};">
              <p style="margin:0;font-size:15px;font-weight:800;letter-spacing:0.04em;text-transform:uppercase;color:${GC.black};font-family:${GC.font};">
                ${escapeHtml(headerTitle)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 16px 0;font-family:${GC.font};">
              <span style="display:inline-block;padding:4px 10px;background:${badgeColor};color:${GC.black};font-size:11px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;">
                ${escapeHtml(badgeLabel)}
              </span>
            </td>
          </tr>
          ${buttonsHtml}
          ${rowsHtml}
          ${metaHtml}
          ${footerHtml}
          <tr>
            <td colspan="2" style="padding:12px 16px 16px;border-top:1px dashed ${GC.dash};font-size:11px;color:${GC.muted};font-family:${GC.font};">
              Grey Chair · Ohio Hound Rescue review
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function reviewPageUrl(pageUrl?: string): string | undefined {
  if (!pageUrl) return undefined;
  try {
    const url = new URL(pageUrl);
    return `${url.origin}/review`;
  } catch {
    return undefined;
  }
}

function link(href: string, label?: string): string {
  const text = label ?? href;
  return `<a href="${escapeHtml(href)}" style="color:${GC.link};text-decoration:underline;">${escapeHtml(text)}</a>`;
}

export function buildReviewCommentEmail({
  reviewerName,
  flagId,
  question,
  comment,
  pageUrl,
  sentAt,
}: {
  reviewerName: string;
  flagId: string;
  question: string;
  comment: string;
  pageUrl?: string;
  sentAt: string;
}): { subject: string; body: string; html: string } {
  const subject = `OHR site review | ${flagId} | ${reviewerName}`;
  const body = [
    "New answer from the Ohio Hound Rescue content review.",
    "",
    `Reviewer: ${reviewerName}`,
    `Question ID: ${flagId}`,
    `Question: ${question}`,
    pageUrl ? `Page: ${pageUrl}` : "",
    "",
    "Answer:",
    comment,
  ]
    .filter(Boolean)
    .join("\n");

  const reviewUrl = reviewPageUrl(pageUrl);
  const submitted = new Date(sentAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const html = greychairEmailLayout({
    preheader: `${reviewerName} answered a review question`,
    headerTitle: "New review answer",
    badgeLabel: "Received",
    badgeColor: GC.green,
    primaryButton: pageUrl ? { label: "View on site", href: pageUrl } : undefined,
    secondaryButton: reviewUrl ? { label: "All questions", href: reviewUrl } : undefined,
    rows: [
      { label: "From", value: escapeHtml(reviewerName) },
      { label: "Question", value: formatMultiline(question) },
      { label: "Answer", value: formatMultiline(comment) },
      {
        label: "Page",
        value: pageUrl ? link(pageUrl) : "—",
      },
      { label: "Submitted", value: escapeHtml(submitted) },
    ],
    metaLines: [`flagId=${flagId}`, `type=review-comment`, `sentAt=${sentAt}`],
  });

  return { subject, body, html };
}

export function buildActionItemEmail({
  reviewerName,
  flagId,
  question,
  comment,
  pageUrl,
  sentAt,
}: {
  reviewerName: string;
  flagId: string;
  question: string;
  comment: string;
  pageUrl?: string;
  sentAt: string;
}): { subject: string; body: string; html: string } {
  const subject = `OHR action item | ${flagId} | ${reviewerName}`;
  const body = [
    "New action item from the Ohio Hound Rescue content review.",
    "",
    `Reviewer: ${reviewerName}`,
    `Item ID: ${flagId}`,
    `Question: ${question}`,
    pageUrl ? `Page: ${pageUrl}` : "",
    "",
    "Response:",
    comment,
  ]
    .filter(Boolean)
    .join("\n");

  const reviewUrl = reviewPageUrl(pageUrl);
  const submitted = new Date(sentAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const html = greychairEmailLayout({
    preheader: `${reviewerName} responded to an action item`,
    headerTitle: "New action item",
    badgeLabel: "Action",
    badgeColor: GC.orange,
    primaryButton: pageUrl ? { label: "View on site", href: pageUrl } : undefined,
    secondaryButton: reviewUrl ? { label: "All questions", href: reviewUrl } : undefined,
    rows: [
      { label: "From", value: escapeHtml(reviewerName) },
      { label: "Item", value: formatMultiline(question) },
      { label: "Response", value: formatMultiline(comment) },
      { label: "Page", value: pageUrl ? link(pageUrl) : "—" },
      { label: "Submitted", value: escapeHtml(submitted) },
    ],
    metaLines: [`flagId=${flagId}`, `type=action-item`, `sentAt=${sentAt}`],
  });

  return { subject, body, html };
}

export function buildLaunchAccessEmail({
  reviewerName,
  responseType,
  credentials,
  note,
  pageUrl,
  sentAt,
}: {
  reviewerName: string;
  responseType: "will_send_separately" | "dont_have_yet" | "submit_credentials";
  credentials?: string;
  note?: string;
  pageUrl?: string;
  sentAt: string;
}): { subject: string; body: string; html: string } {
  const isSeparate = responseType === "will_send_separately";
  const isDontHaveYet = responseType === "dont_have_yet";
  const subject = isDontHaveYet
    ? `Ryloc launch access | No domain/DNS access yet | ${reviewerName}`
    : isSeparate
      ? `Ryloc launch access | Will send logins separately | ${reviewerName}`
      : `Ryloc launch access | Credentials from ${reviewerName}`;

  const body = isDontHaveYet
    ? [
        "Ryloc Parts — launch access",
        "",
        `${reviewerName} does not have domain registrar or DNS access yet.`,
        note?.trim() ? `\nNote:\n${note.trim()}` : "",
        pageUrl ? `\nPage: ${pageUrl}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    : isSeparate
      ? [
          "Ryloc Parts — launch access",
          "",
          `${reviewerName} will provide domain / DNS logins separately`,
        "(phone, text, in person, etc.) — not through the secure form.",
        note?.trim() ? `\nNote:\n${note.trim()}` : "",
        pageUrl ? `\nPage: ${pageUrl}` : "",
      ]
        .filter(Boolean)
        .join("\n")
      : [
          "Ryloc Parts — launch access credentials (confidential)",
        "",
        `Submitted by: ${reviewerName}`,
        pageUrl ? `Page: ${pageUrl}` : "",
        "",
        "Login details:",
        "",
        credentials?.trim() ?? "",
        note?.trim() ? `\n\nExtra note:\n${note.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n");

  const reviewUrl = reviewPageUrl(pageUrl);
  const submitted = new Date(sentAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const rows: { label: string; value: string }[] = [
    { label: "From", value: escapeHtml(reviewerName) },
    {
      label: "How",
      value: isDontHaveYet
        ? "Does not have domain/DNS access yet"
        : isSeparate
          ? "Will send logins separately (phone, text, or in person)"
          : "Submitted via secure form on the review site",
    },
  ];

  if (!isSeparate && !isDontHaveYet && credentials?.trim()) {
    rows.push({
      label: "Logins",
      value: `<span style="font-family:${GC.mono};font-size:13px;white-space:pre-wrap;word-break:break-word;">${formatMultiline(credentials.trim())}</span>`,
    });
  }

  if (note?.trim()) {
    rows.push({ label: "Note", value: formatMultiline(note.trim()) });
  }

  rows.push(
    { label: "Page", value: pageUrl ? link(pageUrl) : "—" },
    { label: "Submitted", value: escapeHtml(submitted) },
  );

  const html = greychairEmailLayout({
    preheader: isDontHaveYet
      ? `${reviewerName} does not have domain/DNS access yet`
      : isSeparate
        ? `${reviewerName} will send launch logins separately`
        : `Confidential launch credentials from ${reviewerName}`,
    headerTitle: "Launch access",
    badgeLabel: isDontHaveYet ? "Pending" : isSeparate ? "Handoff" : "Confidential",
    badgeColor: isDontHaveYet ? GC.orange : isSeparate ? GC.orange : GC.red,
    primaryButton: reviewUrl ? { label: "Review page", href: reviewUrl } : undefined,
    secondaryButton: pageUrl ? { label: "View on site", href: pageUrl } : undefined,
    rows,
    metaLines: [
      `responseType=${responseType}`,
      `reviewer=${reviewerName}`,
      `sentAt=${sentAt}`,
    ],
    footerNote:
      !isSeparate && !isDontHaveYet
        ? "Confidential — do not forward. Delete after storing in your password manager."
        : undefined,
  });

  return { subject, body, html };
}
