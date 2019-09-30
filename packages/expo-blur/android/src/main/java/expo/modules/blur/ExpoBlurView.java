package expo.modules.blur;

import java.util.ArrayList;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Blur;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.graphics.Shader;
import android.util.TypedValue;
import android.view.View;

import eightbitlab.com.blurview.BlurView;
import eightbitlab.com.blurview.RenderScriptBlur;

public class ExpoBlurView extends BlurView {
  private final Paint mPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
  private Path mPathForBorderRadius;
  private RectF mTempRectForBorderRadius;

  private int mOverlayColor;
  private float mIntensity;
  private float[] mBorderRadii = {0, 0, 0, 0, 0, 0, 0, 0};

  public BlurView(Context context) {
    super(context);
  }

  @Override
  protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
      super.onMeasure(widthMeasureSpec, heightMeasureSpec);
  }

  @Override
  protected void onDraw(Canvas canvas) {
      super.onDraw(canvas);
  }

  public void create(View decorView, float radius) {

      ViewGroup rootView = decorView.findViewById(android.R.id.content);
      Drawable windowBackground = decorView.getBackground();

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
          setupWith(rootView)
                  .setFrameClearDrawable(windowBackground)
                  .setBlurAlgorithm(new RenderScriptBlur(getContext()))
                  .setBlurRadius(radius)
                  .setHasFixedTransformationMatrix(true);
      }
  }
 
  private void drawBlur() {

    setupWith(rootView)
      .setOverlayColor(mOverlayColor)
      .setFrameClearDrawable(windowBackground)
      .setBlurAlgorithm(new RenderScriptBlur(getContext()))
      .setBlurRadius(mIntensity)
      .setHasFixedTransformationMatrix(true);
  }

  public void setOverlayColor(final Integer overlayColor) {
    mOverlayColor = overlayColor.intValue();
    drawBlur();
  }

  public void setIntensity(final Double intensity) {
    mIntensity = intensity.floatValue();
    drawBlur();
  }

  public void setBorderRadii(final ArrayList<Double> borderRadii) {
    float[] _radii = new float[borderRadii.size()];
    for (int i=0; i < _radii.length; i++)
    {
       _radii[i] = toPixelFromDIP(borderRadii.get(i).floatValue());
    }
  
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      setBackground(new RoundedCornersDrawable(mBorderRadii));
      setOutlineProvider(ViewOutlineProvider.BACKGROUND);
      setClipToOutline(true);
    }
  }

  // Copied from RN PixelUtil
  // We might want to expose display metrics on @unimodules/core somewhere to avoid
  // having code similar to this littered throughout modules
  private float toPixelFromDIP(float value) {
    return TypedValue.applyDimension(
        TypedValue.COMPLEX_UNIT_DIP,
        value,
        getContext().getResources().getDisplayMetrics()
    );
  }

}
