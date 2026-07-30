# Design QA - 代理商排行全部页面

- Source visual truth paths:
  - `C:\Users\ac596\AppData\Local\Temp\codex-clipboard-1439a91a-bdde-4f71-b44b-98b899f161ea.png`
  - `C:\Users\ac596\AppData\Local\Temp\codex-clipboard-c99b2196-3dbd-4cb9-817c-7a5284bf17bd.png`
- Implementation screenshot path: unavailable
- Local implementation URL: `http://127.0.0.1:5173/`
- State: click `代理商排行` card header `全部`, then view `代理商排行`; or click `P3/P4/P5全国排行` row `明细`, then view the matching `P3/P4/P5代理商明细`
- Dashboard top region filter: the `大区` dropdown uses `全国` as the all-data option, no longer includes a separate `全部` option, and includes `第五大区`.
- Dashboard regional performance: the `大区业绩` chart includes `第五大区` as a visible slice, amount callout, and legend item.
- Dashboard total performance statistic: the `P团队业绩排行` card row now includes a leading `总业绩统计` card. It uses the current top `大区` filter: `全国` shows the overall total, while a selected region shows that region's total performance.
- Dashboard layout hierarchy: the home dashboard is organized as top `总业绩统计 + 大区业绩`, then `P团队业绩` cards for P5/P4/P3, then ranking data charts/lists below.
- Dashboard agent performance placement: the separate bottom `代理商业绩` overview module has been removed.
- Dashboard agent ranking statistics: the `代理商排行` section keeps the `分院统计`, `爱心大使统计`, and `代理商全国排行` cards.
- Dashboard agent ranking card style: the `分院统计`, `爱心大使统计`, and `代理商全国排行` cards use the same card shell, title area, divider, list rhythm, and progress-bar treatment.
- Dashboard summary ranking rows: the `分院统计` and `爱心大使统计` progress rows now match `代理商全国排行` with left-aligned rank number, name, progress track, and right-side amount.
- Dashboard section-title cleanup: the section labels `总业绩统计`, `P团队业绩`, and `排行数据` are hidden/removed so their content appears directly, while the `代理商业绩` module label remains.
- Dashboard total KPI style: the top `总业绩` card uses the same white-card visual language as the page: light border, subtle shadow, small blue marker, centered `总业绩统计` primary amount block with a 36px red amount, and a centered two-column bottom summary bar for compare and growth rate to avoid the previous boxed/form-like look.
- Full-view comparison evidence: blocked because no Browser or Chrome screenshot tool is available in this thread, and Playwright use requires explicit user approval.
- Focused region comparison evidence: blocked for the same reason.

**Findings**

- [P0] Screenshot-based visual QA cannot be completed
  Location: Product Design QA workflow.
  Evidence: the source screenshots are available, the app builds and serves locally, but there is no permitted browser capture tool available to capture the implementation and create the required side-by-side comparison.
  Impact: I cannot truthfully certify pixel/layout fidelity against the reference screenshots.
  Fix: run an approved browser capture path, or approve Playwright so the rendered 代理商排行全部 page can be captured and compared against the provided reference images.

**Implemented Surfaces Checked By Code**

- Entry: `代理商排行` card `全部` opens `ranking-agent`; `P3/P4/P5全国排行` row `明细` opens the corresponding `ranking-p3-agent-detail`, `ranking-p4-agent-detail`, or `ranking-p5-agent-detail`.
- Page copy: 代理商排行页面 breadcrumb/tab/heading/sub-tab uses `代理商排行`; P3/P4/P5二级页 breadcrumb/tab/heading uses `P3/P4/P5代理商明细`, sub-tab uses `代理商明细`.
- Filters: `代理商名称`, `身份标签`, `所属大区`, `所属P3`; expanded filters include `所属P4`, `所属P5`. The `所属大区` option set also includes `第五大区`.
- Search behavior: `代理商名称` input also matches phone numbers, matching the placeholder intent.
- Export: orange `导出` button appears above the table.
- Table fields: `全国排名`, `代理商名称`, `手机号码`, `身份标签`, `对应身份排名`, `所属分院`, `所属大区`, `所属P3`, `所属P3负责人`, `所属P3负责人电话`, `所属P4`, `所属P4负责人`, `所属P4负责人电话`, `所属P5`, `所属P5负责人`, `所属P5负责人电话`, `业绩总额（￥）`, `操作`.
- Added grouped metric fields after the base ranking fields:
  - `代理商本人（企业账户￥）`: `囤课程卡`, `囤权益卡`, `消费课程卡`, `消费专业课`, `消费陪学营`, `消费线下课`.
  - `代理商名下普通学员（￥）`: `囤课程卡`, `囤权益卡`, `消费课程卡`, `消费权益卡`, `消费专业课`, `消费陪学营`, `消费线下课`.
  - `代理商直推代理商（课程券￥）`: `囤课程卡`, `囤权益卡`, `消费课程卡`, `消费专业课`, `消费陪学营`, `消费线下课`.
- Operation: row-level `明细` is a blue text-only button with no background and is sticky on the right for horizontal scrolling.
- P3/P4/P5 detail pages: reuse the 代理商排行 filters, grouped amount columns, pagination, and sticky operation column, but remove the `全国排名` and `对应身份排名` columns. The main 代理商排行 list still keeps `对应身份排名`.
- P3 ranking marker: `P3全国排行` does not add a separate marker column. When any agent detail under that P3 has `hasSplitPerformance`, the `P3` name cell shows a compact orange icon beside the P3 name. Hover/accessibility text is `存在拆分业绩`; otherwise no icon is shown.
- P3/P4/P5 agent detail marker: the derived `P3/P4/P5代理商明细` lists do not add a marker column. Agents with `hasSplitPerformance` show the same compact orange icon beside `代理商名称`, with hover/accessibility text `存在拆分业绩`. The main `代理商排行` list intentionally does not show this marker.
- Agent order detail page: clicking `明细` from a 代理商明细 list opens `代理商订单明细`, with filters for `支付人名称或手机号`, `所属爱心大使`, `所属分院`, `所属大区`, export buttons, a wide order table, and pagination.
- Split order logic: not every order is marked. Only individual rows with `hasSplitPerformance` show the compact orange icon in the `支付金额` cell; those split rows show `14900` (`29800 / 2`), while ordinary rows keep `29800` and no icon.
- Pagination: total count is `1456`, default page size is `5条/页`, with numbered pagination and jump input.

**Verification**

- `npm run build` passed.
- Local Vite app responds with HTTP 200 at `http://127.0.0.1:5173/`.

**Open Questions**

- Whether to authorize Playwright/browser capture for screenshot-level Product Design QA.

final result: blocked
