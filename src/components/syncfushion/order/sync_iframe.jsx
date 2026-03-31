function MyPage() {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <iframe
        src="https://api.herofashion.com/bi/site/site2/dashboards/a9f3eb35-2d95-43cb-bcab-cfbcbd184154/Hero%20Order/NewOrder?isembed=true&views=false&embed_dashboard_views_edit=false&hide_header=false&hide_metrics=false&hide_dashboard_edit=true&hide_language_dropdown=false&dashboard_comments=false&widget_comments=false&enable_ai_assistant=false"
        title="Dashboard"
        style={{
          width: "100vw",
          height: "100vh",
          border: "none"
        }}
        allowFullScreen
      />
    </div>
  );
}

export default MyPage;