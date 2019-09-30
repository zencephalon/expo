package expo.modules.blur;

import android.content.Context;

import org.unimodules.core.ViewManager;
import org.unimodules.core.interfaces.ExpoProp;

import java.util.ArrayList;

public class BlurManager extends ViewManager<ExpoBlurView> {
  public static final String VIEW_CLASS_NAME = "ExpoBlurView";
  public static final String PROP_OVERLAY_COLOR = "overlayColor";
  public static final String PROP_INTENSITY = "intensity";
  public static final String PROP_BORDER_RADII = "borderRadii";

  @Override
  public String getName() {
    return VIEW_CLASS_NAME;
  }
  @Override
  public ExpoBlurView createViewInstance(Context context) {
    return new ExpoBlurView(context);
  }

  @Override
  public ViewManagerType getViewManagerType() {
    return ViewManagerType.SIMPLE;
  }

  @ExpoProp(name = PROP_OVERLAY_COLOR)
  public void setOverlayColor(ExpoBlurView view, final Integer overlayColor) {
    view.setOverlayColor(overlayColor);
  }

  @ExpoProp(name = PROP_INTENSITY)
  public void setIntensity(ExpoBlurView view, final Double intensity) {
      view.setIntensity(intensity);
  }

  // temporary solution until following issue is resolved:
  // https://github.com/facebook/react-native/issues/3198
  @ExpoProp(name = PROP_BORDER_RADII)
  public void setBorderRadii(BlurView view, final ArrayList<Double> borderRadii) {
    view.setBorderRadii(borderRadii);
  }
}
