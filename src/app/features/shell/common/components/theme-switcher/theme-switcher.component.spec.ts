import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePlatformDataBus } from '@hp/client/data/platform-data-bus';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { ShellThemeSwitcherComponent } from './shell-theme-switcher.component';

describe('ShellThemeSwitcherComponent', (): void => {
  let component: ShellThemeSwitcherComponent;
  let fixture: ComponentFixture<ShellThemeSwitcherComponent>;

  beforeEach(async (): Promise<void> => {
    global.matchMedia = jest.fn(
      (): MediaQueryList => ({ matches: true }) as MediaQueryList,
    );
    await TestBed.configureTestingModule({
      imports: [
        ShellThemeSwitcherComponent,
        TranslocoTestingModule.forRoot({}),
      ],
      providers: [providePlatformDataBus()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellThemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
